import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create sample templates
  const templates = [
    // Wedding Invitations
    {
      name: 'Elegant Wedding Invitation',
      description: 'Classic and elegant wedding invitation with floral accents',
      category: 'INVITATION',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      width: 1200,
      height: 1800,
      isFeatured: true,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: 'You are invited', x: 600, y: 200, fontSize: 48, fontFamily: 'Playfair Display' },
          { type: 'text', content: '[Bride] & [Groom]', x: 600, y: 900, fontSize: 72, fontFamily: 'Playfair Display' },
          { type: 'text', content: '[Date]', x: 600, y: 1000, fontSize: 32 },
          { type: 'text', content: '[Venue]', x: 600, y: 1100, fontSize: 28 },
        ],
        variables: {
          bride: { type: 'text', label: 'Bride Name', default: 'Jane' },
          groom: { type: 'text', label: 'Groom Name', default: 'John' },
          date: { type: 'text', label: 'Wedding Date', default: 'December 15, 2025' },
          venue: { type: 'text', label: 'Venue', default: 'Grand Hotel Ballroom' },
        },
      },
    },
    {
      name: 'Modern Minimalist Wedding',
      description: 'Clean and modern wedding invitation design',
      category: 'INVITATION',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop',
      width: 1200,
      height: 1800,
      isFeatured: true,
      isPremium: true,
      data: {
        elements: [
          { type: 'text', content: '[Bride] + [Groom]', x: 600, y: 900, fontSize: 64, fontFamily: 'Montserrat' },
          { type: 'text', content: '[Date]', x: 600, y: 1050, fontSize: 24 },
        ],
        variables: {
          bride: { type: 'text', label: 'Bride Name', default: 'Sarah' },
          groom: { type: 'text', label: 'Groom Name', default: 'Michael' },
          date: { type: 'text', label: 'Wedding Date', default: '06.15.2026' },
        },
      },
    },

    // Birthday Invitations
    {
      name: 'Kids Birthday Party',
      description: 'Fun and colorful birthday party invitation for kids',
      category: 'INVITATION',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
      width: 1200,
      height: 1600,
      isFeatured: false,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: "You're Invited!", x: 600, y: 200, fontSize: 56, fontFamily: 'Comic Sans MS' },
          { type: 'text', content: "[Child]'s Birthday", x: 600, y: 800, fontSize: 48 },
          { type: 'text', content: 'Turning [Age]!', x: 600, y: 900, fontSize: 40 },
          { type: 'text', content: '[Date] at [Time]', x: 600, y: 1200, fontSize: 32 },
        ],
        variables: {
          child: { type: 'text', label: 'Child Name', default: 'Emma' },
          age: { type: 'text', label: 'Age', default: '7' },
          date: { type: 'text', label: 'Party Date', default: 'Saturday, March 20' },
          time: { type: 'text', label: 'Party Time', default: '2:00 PM' },
        },
      },
    },

    // Flyers
    {
      name: 'Business Flyer - Bold',
      description: 'Eye-catching business flyer with bold typography',
      category: 'FLYER',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
      width: 2100,
      height: 2970,
      isFeatured: true,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: '[Headline]', x: 1050, y: 400, fontSize: 96, fontFamily: 'Impact' },
          { type: 'text', content: '[Subheading]', x: 1050, y: 600, fontSize: 48 },
          { type: 'text', content: '[Details]', x: 1050, y: 1500, fontSize: 32 },
        ],
        variables: {
          headline: { type: 'text', label: 'Headline', default: 'GRAND OPENING' },
          subheading: { type: 'text', label: 'Subheading', default: 'Join us for our big day!' },
          details: { type: 'text', label: 'Details', default: 'Special offers and giveaways' },
        },
      },
    },
    {
      name: 'Event Flyer - Music',
      description: 'Perfect for concerts, DJ nights, and music events',
      category: 'FLYER',
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop',
      width: 2100,
      height: 2970,
      isFeatured: true,
      isPremium: true,
      data: {
        elements: [
          { type: 'text', content: '[Event Name]', x: 1050, y: 1000, fontSize: 120, fontFamily: 'Bebas Neue' },
          { type: 'text', content: '[Date]', x: 1050, y: 1800, fontSize: 48 },
          { type: 'text', content: '[Venue]', x: 1050, y: 1900, fontSize: 40 },
        ],
        variables: {
          eventName: { type: 'text', label: 'Event Name', default: 'SUMMER BEATS' },
          date: { type: 'text', label: 'Date', default: 'July 15, 2025' },
          venue: { type: 'text', label: 'Venue', default: 'The Music Hall' },
        },
      },
    },

    // Social Media Posts
    {
      name: 'Instagram Quote Post',
      description: 'Inspirational quote for Instagram',
      category: 'SOCIAL_MEDIA',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      width: 1080,
      height: 1080,
      isFeatured: false,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: '[Quote]', x: 540, y: 540, fontSize: 56, fontFamily: 'Georgia' },
          { type: 'text', content: '- [Author]', x: 540, y: 700, fontSize: 32 },
        ],
        variables: {
          quote: { type: 'text', label: 'Quote', default: 'Be yourself; everyone else is already taken.' },
          author: { type: 'text', label: 'Author', default: 'Oscar Wilde' },
        },
      },
    },
    {
      name: 'Product Announcement',
      description: 'Promote your new product on social media',
      category: 'SOCIAL_MEDIA',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      width: 1080,
      height: 1080,
      isFeatured: false,
      isPremium: true,
      data: {
        elements: [
          { type: 'text', content: '[Product]', x: 540, y: 400, fontSize: 72, fontFamily: 'Montserrat' },
          { type: 'text', content: '[Tagline]', x: 540, y: 600, fontSize: 36 },
          { type: 'text', content: '[CTA]', x: 540, y: 800, fontSize: 28 },
        ],
        variables: {
          product: { type: 'text', label: 'Product Name', default: 'NEW PRODUCT' },
          tagline: { type: 'text', label: 'Tagline', default: 'Innovation at its finest' },
          cta: { type: 'text', label: 'Call to Action', default: 'Shop Now' },
        },
      },
    },

    // Posters
    {
      name: 'Movie Night Poster',
      description: 'Vintage-style movie night poster',
      category: 'POSTER',
      thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
      width: 2400,
      height: 3600,
      isFeatured: true,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: 'MOVIE NIGHT', x: 1200, y: 600, fontSize: 120, fontFamily: 'Impact' },
          { type: 'text', content: '[Movie Title]', x: 1200, y: 1800, fontSize: 96 },
          { type: 'text', content: '[Date & Time]', x: 1200, y: 2800, fontSize: 56 },
        ],
        variables: {
          movieTitle: { type: 'text', label: 'Movie Title', default: 'Classic Film Festival' },
          dateTime: { type: 'text', label: 'Date & Time', default: 'Friday 8PM' },
        },
      },
    },
    {
      name: 'Motivational Poster',
      description: 'Inspire your team with motivational poster',
      category: 'POSTER',
      thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=600&fit=crop',
      width: 2400,
      height: 3600,
      isFeatured: false,
      isPremium: true,
      data: {
        elements: [
          { type: 'text', content: '[Message]', x: 1200, y: 1800, fontSize: 120, fontFamily: 'Helvetica' },
        ],
        variables: {
          message: { type: 'text', label: 'Motivational Message', default: 'NEVER GIVE UP' },
        },
      },
    },

    // Banners
    {
      name: 'Sale Banner',
      description: 'Announce your special sales and promotions',
      category: 'BANNER',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop',
      width: 1920,
      height: 1080,
      isFeatured: false,
      isPremium: false,
      data: {
        elements: [
          { type: 'text', content: '[Discount]% OFF', x: 960, y: 400, fontSize: 120, fontFamily: 'Impact' },
          { type: 'text', content: '[Event]', x: 960, y: 600, fontSize: 64 },
          { type: 'text', content: '[Dates]', x: 960, y: 800, fontSize: 40 },
        ],
        variables: {
          discount: { type: 'text', label: 'Discount Percentage', default: '50' },
          event: { type: 'text', label: 'Event Name', default: 'SUMMER SALE' },
          dates: { type: 'text', label: 'Sale Dates', default: 'June 1-30' },
        },
      },
    },
  ];

  console.log('Creating templates...');
  for (const template of templates) {
    await prisma.template.create({
      data: template,
    });
    console.log(`✓ Created: ${template.name}`);
  }

  console.log('\n✅ Seed completed!');
  console.log(`📊 Created ${templates.length} templates`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
