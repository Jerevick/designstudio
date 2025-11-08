import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Create Professional Designs in Seconds
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No design skills needed. Choose from hundreds of templates and create stunning invitations, flyers, and social media graphics.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Design Studio?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create professional designs in minutes, not hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our intuitive interface and smart templates help you create stunning designs without any learning curve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Templates</CardTitle>
                <CardDescription>
                  Access hundreds of professionally designed templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose from a vast library of templates for invitations, flyers, social media posts, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Anywhere</CardTitle>
                <CardDescription>
                  Download in multiple formats for any use case
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Export your designs as PNG, JPG, PDF, or SVG. Perfect for print and digital use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Create Amazing Designs?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Design Studio to bring their ideas to life.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Start Creating Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
