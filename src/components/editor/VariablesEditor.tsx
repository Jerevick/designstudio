'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Variable {
  type: string;
  label: string;
  default: string;
}

interface VariablesEditorProps {
  variables: Record<string, Variable>;
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export function VariablesEditor({
  variables,
  values,
  onChange,
}: VariablesEditorProps) {
  const handleChange = (key: string, value: string) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customize Your Design</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(variables).map(([key, variable]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{variable.label}</Label>
            {variable.type === 'text' ? (
              <Input
                id={key}
                type="text"
                value={values[key] || variable.default}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={variable.default}
              />
            ) : variable.type === 'color' ? (
              <div className="flex gap-2">
                <Input
                  id={key}
                  type="color"
                  value={values[key] || variable.default}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={values[key] || variable.default}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={variable.default}
                  className="flex-1"
                />
              </div>
            ) : (
              <Input
                id={key}
                type="text"
                value={values[key] || variable.default}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={variable.default}
              />
            )}
          </div>
        ))}

        {Object.keys(variables).length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            This template has no customizable fields.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
