'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DesignCanvas } from '@/components/editor/DesignCanvas';
import { VariablesEditor } from '@/components/editor/VariablesEditor';
import { useDesign, useUpdateDesign, useDeleteDesign } from '@/hooks/queries/useDesigns';
import { useExportDesign } from '@/hooks/queries/useExport';
import { Loader2, Download, Trash2 } from 'lucide-react';

export default function EditDesignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [designName, setDesignName] = useState('');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'pdf' | 'svg'>('png');
  const [hasChanges, setHasChanges] = useState(false);

  const { data: design, isLoading: designLoading } = useDesign(id);
  const updateDesign = useUpdateDesign(id);
  const deleteDesign = useDeleteDesign();
  const exportDesign = useExportDesign();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/editor/' + id);
    }
  }, [status, router, id]);

  useEffect(() => {
    if (design) {
      setDesignName(design.name);
      const designData = design.data as any;
      setVariableValues(designData.variables || {});
    }
  }, [design]);

  const handleSave = async () => {
    if (!design || !designName.trim()) return;

    try {
      await updateDesign.mutateAsync({
        name: designName,
        data: {
          variables: variableValues,
        },
      });
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save design');
    }
  };

  const handleExport = async () => {
    if (!design) return;

    try {
      await exportDesign.mutateAsync({
        designId: design.id,
        format: exportFormat,
        dpi: exportFormat === 'pdf' ? 300 : undefined,
      });
      alert(`Export started! Format: ${exportFormat.toUpperCase()}\nYou'll receive a notification when it's ready.`);
    } catch (error: any) {
      alert(error.message || 'Failed to start export');
    }
  };

  const handleDelete = async () => {
    if (!design) return;
    
    if (confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      try {
        await deleteDesign.mutateAsync(design.id);
        router.push('/dashboard');
      } catch (error: any) {
        alert(error.message || 'Failed to delete design');
      }
    }
  };

  const handleVariableChange = (values: Record<string, string>) => {
    setVariableValues(values);
    setHasChanges(true);
  };

  if (status === 'loading' || designLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session || !design) {
    return null;
  }

  const templateData = design.template.data as any;
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
                onClick={() => router.push('/dashboard')}
              >
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">{design.template.name}</h1>
                <p className="text-sm text-gray-600">{designName}</p>
              </div>
              {hasChanges && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={deleteDesign.isPending}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateDesign.isPending || !hasChanges}
              >
                {updateDesign.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
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
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <DesignCanvas
                  width={design.template.width}
                  height={design.template.height}
                  elements={elements}
                  variables={variableValues}
                />
              </CardContent>
            </Card>

            {/* Export Section */}
            <Card>
              <CardHeader>
                <CardTitle>Export Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Export Format</Label>
                    <Select value={exportFormat} onValueChange={(v: any) => setExportFormat(v)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG (Transparent)</SelectItem>
                        <SelectItem value="jpg">JPG (Smaller file)</SelectItem>
                        <SelectItem value="pdf">PDF (Print ready)</SelectItem>
                        {session.user.subscriptionTier !== 'FREE' && (
                          <SelectItem value="svg">SVG (Vector)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleExport}
                    disabled={exportDesign.isPending}
                    className="min-w-[120px]"
                  >
                    {exportDesign.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  {session.user.subscriptionTier === 'FREE' ? (
                    <>
                      Free tier: PNG only with watermark. <a href="/pricing" className="text-indigo-600 hover:underline">Upgrade</a> for more formats.
                    </>
                  ) : (
                    'Your design will be processed and available for download shortly.'
                  )}
                </p>
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
                  onChange={(e) => {
                    setDesignName(e.target.value);
                    setHasChanges(true);
                  }}
                  placeholder="My Awesome Design"
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Variables Editor */}
            <VariablesEditor
              variables={variables}
              values={variableValues}
              onChange={handleVariableChange}
            />

            {/* Design Info */}
            <Card>
              <CardHeader>
                <CardTitle>Design Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-medium">{design.template.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">
                    {design.template.width} × {design.template.height}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">
                    {new Date(design.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(design.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
