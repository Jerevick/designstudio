'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DesignCanvas } from '@/components/editor/DesignCanvas';
import { VariablesEditor } from '@/components/editor/VariablesEditor';
import { useTemplate } from '@/hooks/queries/useTemplates';
import { useCreateDesign } from '@/hooks/queries/useDesigns';
import { Loader2 } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const templateId = searchParams.get('template');

  const [designName, setDesignName] = useState('');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  const { data: template, isLoading: templateLoading } = useTemplate(templateId || '');
  const createDesign = useCreateDesign();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/editor');
    }
  }, [status, router]);

  useEffect(() => {
    if (template) {
      // Initialize variable values with defaults
      const templateData = template.data as any;
      if (templateData.variables) {
        const initialValues: Record<string, string> = {};
        Object.entries(templateData.variables).forEach(([key, variable]: [string, any]) => {
          initialValues[key] = variable.default || '';
        });
        setVariableValues(initialValues);
      }
    }
  }, [template]);

  const handleSave = async () => {
    if (!template || !designName.trim()) {
      alert('Please enter a design name');
      return;
    }

    try {
      const design = await createDesign.mutateAsync({
        name: designName,
        templateId: template.id,
        data: {
          variables: variableValues,
        },
      });

      router.push(`/editor/${design.id}`);
    } catch (error: any) {
      alert(error.message || 'Failed to create design');
    }
  };

  if (status === 'loading' || templateLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!templateId || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Template Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Please select a template to start designing.
            </p>
            <Button onClick={() => router.push('/templates')}>
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const templateData = template.data as any;
  const elements = templateData.elements || [];
  const variables = templateData.variables || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/templates')}
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">{template.name}</h1>
                <p className="text-sm text-gray-600">New Design</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={createDesign.isPending || !designName.trim()}
              >
                {createDesign.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Design'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Canvas - 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <DesignCanvas
                  width={template.width}
                  height={template.height}
                  elements={elements}
                  variables={variableValues}
                />
              </CardContent>
            </Card>
          </div>

          {/* Controls - 1 column */}
          <div className="space-y-6">
            {/* Design Name */}
            <Card>
              <CardHeader>
                <CardTitle>Design Name</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="designName">Name</Label>
                <Input
                  id="designName"
                  type="text"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  placeholder="My Awesome Design"
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Variables Editor */}
            <VariablesEditor
              variables={variables}
              values={variableValues}
              onChange={setVariableValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
