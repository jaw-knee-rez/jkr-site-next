// Authentication configuration
const AUTH_CONFIG = {
  // In production, these would be environment variables
  PASSWORDS: {
    'atlassian': 'jwm2024',
    'sustainability-app': 'sustainability2024',
    // Add more passwords as needed
  },
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  MAX_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes in milliseconds
};

// Session storage keys
const SESSION_KEYS = {
  AUTHENTICATED_PIECES: 'portfolio_auth_pieces',
  ATTEMPT_COUNT: 'portfolio_auth_attempts',
  LOCKOUT_UNTIL: 'portfolio_auth_lockout',
};

// Types for authentication
export interface AuthResult {
  success: boolean;
  message: string;
  isLocked?: boolean;
  lockoutRemaining?: number;
}

export interface SessionData {
  authenticatedPieces: string[];
  expiresAt: number;
}

// Password validation function
export function validatePassword(pieceSlug: string, password: string): AuthResult {
  // Check if user is currently locked out
  const lockoutUntil = getLockoutUntil();
  if (lockoutUntil && Date.now() < lockoutUntil) {
    const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000 / 60);
    return {
      success: false,
      message: `Too many failed attempts. Please try again in ${remaining} minutes.`,
      isLocked: true,
      lockoutRemaining: remaining,
    };
  }

  // Check if piece requires password
  if (!AUTH_CONFIG.PASSWORDS[pieceSlug as keyof typeof AUTH_CONFIG.PASSWORDS]) {
    return {
      success: false,
      message: 'This portfolio piece does not require authentication.',
    };
  }

  // Validate password
  const correctPassword = AUTH_CONFIG.PASSWORDS[pieceSlug as keyof typeof AUTH_CONFIG.PASSWORDS];
  if (password === correctPassword) {
    // Reset attempt count on successful login
    resetAttemptCount();
    
    // Grant access to the piece
    grantAccess(pieceSlug);
    
    return {
      success: true,
      message: 'Authentication successful!',
    };
  } else {
    // Increment attempt count
    const attempts = incrementAttemptCount();
    
    if (attempts >= AUTH_CONFIG.MAX_ATTEMPTS) {
      // Lock out user
      setLockout();
      return {
        success: false,
        message: `Too many failed attempts. Please try again in ${AUTH_CONFIG.LOCKOUT_DURATION / 1000 / 60} minutes.`,
        isLocked: true,
        lockoutRemaining: AUTH_CONFIG.LOCKOUT_DURATION / 1000 / 60,
      };
    }
    
    const remainingAttempts = AUTH_CONFIG.MAX_ATTEMPTS - attempts;
    return {
      success: false,
      message: `Incorrect password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
    };
  }
}

// Session management functions
export function grantAccess(pieceSlug: string): void {
  try {
    const sessionData = getSessionData();
    sessionData.authenticatedPieces.push(pieceSlug);
    sessionData.expiresAt = Date.now() + AUTH_CONFIG.SESSION_DURATION;
    
    localStorage.setItem(SESSION_KEYS.AUTHENTICATED_PIECES, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to grant access:', error);
  }
}

export function revokeAccess(pieceSlug: string): void {
  try {
    const sessionData = getSessionData();
    sessionData.authenticatedPieces = sessionData.authenticatedPieces.filter(
      piece => piece !== pieceSlug
    );
    
    localStorage.setItem(SESSION_KEYS.AUTHENTICATED_PIECES, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to revoke access:', error);
  }
}

export function hasAccess(pieceSlug: string): boolean {
  try {
    const sessionData = getSessionData();
    
    // Check if session has expired
    if (Date.now() > sessionData.expiresAt) {
      clearSession();
      return false;
    }
    
    return sessionData.authenticatedPieces.includes(pieceSlug);
  } catch (error) {
    console.error('Failed to check access:', error);
    return false;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEYS.AUTHENTICATED_PIECES);
    localStorage.removeItem(SESSION_KEYS.ATTEMPT_COUNT);
    localStorage.removeItem(SESSION_KEYS.LOCKOUT_UNTIL);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

// Helper functions
function getSessionData(): SessionData {
  try {
    const stored = localStorage.getItem(SESSION_KEYS.AUTHENTICATED_PIECES);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        authenticatedPieces: data.authenticatedPieces || [],
        expiresAt: data.expiresAt || 0,
      };
    }
  } catch (error) {
    console.error('Failed to parse session data:', error);
  }
  
  return {
    authenticatedPieces: [],
    expiresAt: 0,
  };
}

function incrementAttemptCount(): number {
  try {
    const attempts = parseInt(localStorage.getItem(SESSION_KEYS.ATTEMPT_COUNT) || '0') + 1;
    localStorage.setItem(SESSION_KEYS.ATTEMPT_COUNT, attempts.toString());
    return attempts;
  } catch (error) {
    console.error('Failed to increment attempt count:', error);
    return 1;
  }
}

function resetAttemptCount(): void {
  try {
    localStorage.removeItem(SESSION_KEYS.ATTEMPT_COUNT);
  } catch (error) {
    console.error('Failed to reset attempt count:', error);
  }
}

function getLockoutUntil(): number | null {
  try {
    const lockoutUntil = localStorage.getItem(SESSION_KEYS.LOCKOUT_UNTIL);
    return lockoutUntil ? parseInt(lockoutUntil) : null;
  } catch (error) {
    console.error('Failed to get lockout time:', error);
    return null;
  }
}

function setLockout(): void {
  try {
    const lockoutUntil = Date.now() + AUTH_CONFIG.LOCKOUT_DURATION;
    localStorage.setItem(SESSION_KEYS.LOCKOUT_UNTIL, lockoutUntil.toString());
  } catch (error) {
    console.error('Failed to set lockout:', error);
  }
}

// Utility functions for external use
export function getProtectedPieces(): string[] {
  return Object.keys(AUTH_CONFIG.PASSWORDS);
}

export function isPieceProtected(pieceSlug: string): boolean {
  return pieceSlug in AUTH_CONFIG.PASSWORDS;
}

export function getSessionExpiry(): number | null {
  try {
    const sessionData = getSessionData();
    return sessionData.expiresAt > 0 ? sessionData.expiresAt : null;
  } catch {
    return null;
  }
}

// Auto-cleanup expired sessions
if (typeof window !== 'undefined') {
  // Check for expired sessions every hour
  setInterval(() => {
    const sessionData = getSessionData();
    if (Date.now() > sessionData.expiresAt && sessionData.expiresAt > 0) {
      clearSession();
    }
  }, 60 * 60 * 1000); // 1 hour
}
