'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { validatePassword } from '../lib/auth';

interface PasswordProtectionProps {
  pieceSlug: string;
  onSuccess: () => void;
  title?: string;
  description?: string;
  errorMessage?: string;
}

export default function PasswordProtection({ 
  pieceSlug,
  onSuccess, 
  title = "Protected Content",
  description = "This portfolio piece is password protected. Please enter the password to continue.",
  errorMessage = "Incorrect password. Please try again."
}: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    try {
      // Validate password using the authentication system
      const result = validatePassword(pieceSlug, password);
      
      if (result.success) {
        onSuccess();
      } else {
        setError(true);
        if (result.isLocked) {
          setAttempts(prev => prev + 1);
        } else {
          setAttempts(prev => prev + 1);
        }
        throw new Error(result.message);
      }
    } catch {
      setError(true);
      setAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <LockClosedIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Password Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors duration-200 ${
                  error 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                    : 'border-border bg-background hover:border-accent focus:border-accent'
                } focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
                placeholder="Enter password"
                disabled={isLoading}
                autoComplete="current-password"
                aria-describedby={error ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="password-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errorMessage || 'Authentication failed. Please try again.'}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full py-3 px-4 bg-foreground text-background rounded-lg font-medium transition-all duration-200 hover:bg-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              'Access Content'
            )}
          </button>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              This content is protected for client confidentiality.
            </p>
            {attempts > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Attempts: {attempts}
              </p>
            )}
          </div>
        </motion.form>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2"
          >
            ← Back to Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
