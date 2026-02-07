'use client';

import { useState } from 'react';
import { AccessibleButton } from '@/components/AccessibleButton';
import { AccessibleInput } from '@/components/AccessibleInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function TestPage() {
  const [value, setValue, isLoading] = useLocalStorage('test-value', 'initial');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Component Test Page</h1>

      {/* Test AccessibleButton */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">AccessibleButton Test</h2>
        <div className="flex gap-4 flex-wrap">
          <AccessibleButton variant="primary" icon="✓">
            Primary Button
          </AccessibleButton>
          <AccessibleButton variant="secondary" icon="⚙">
            Secondary
          </AccessibleButton>
          <AccessibleButton variant="danger">Danger</AccessibleButton>
          <AccessibleButton variant="ghost">Ghost</AccessibleButton>
          <AccessibleButton loading>Loading...</AccessibleButton>
          <AccessibleButton disabled>Disabled</AccessibleButton>
        </div>
      </section>

      {/* Test AccessibleInput */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">AccessibleInput Test</h2>
        <div className="space-y-4 max-w-md">
          <AccessibleInput
            label="Enter your name"
            placeholder="John Doe"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <AccessibleInput
            label="Email address"
            type="email"
            placeholder="john@example.com"
            hint="We'll never share your email"
          />

          <AccessibleInput label="Password" type="password" error="Password is required" />

          <AccessibleInput label="Username" value="testuser" disabled />
        </div>
      </section>

      {/* Test useLocalStorage */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">useLocalStorage Hook Test</h2>
        <div className="max-w-md">
          {isLoading ? (
            <p>Loading from localStorage...</p>
          ) : (
            <>
              <AccessibleInput
                label="LocalStorage value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Current value: {value}
              </p>
              <AccessibleButton variant="secondary" onClick={() => setValue('')} className="mt-2">
                Clear
              </AccessibleButton>
            </>
          )}
        </div>
      </section>

      {/* Test keyboard navigation */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Keyboard Navigation Test</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Try navigating with Tab, use Enter to activate buttons, and verify focus indicators.
        </p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((num) => (
            <AccessibleButton key={num} variant="ghost">
              Button {num}
            </AccessibleButton>
          ))}
        </div>
      </section>
    </div>
  );
}
