import { supabase } from "@/lib/supabase";
import HomeClient from "./HomeClient";

// Metadata for homepage
export const metadata = {
  title: "Fabrico Fashion - Best Premium Fashion & Lifestyle in Bangladesh",
  description: "Explore Fabrico Fashion for premium clothing, high-quality panjabi, embroidery designs, gadgets, smart electronics, home & lifestyle products in Bangladesh.",
};

export default async function Home() {
  let products: any[] = [];
  let settings: any = null;

  try {
    // Server-side fetching from Supabase
    const { data: dbProducts } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (dbProducts) {
      products = dbProducts;
    }

    const { data: dbSettings } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (dbSettings) {
      settings = dbSettings;
    }
  } catch (err) {
    console.error("Error fetching homepage data on server:", err);
  }

  // Structured schemas for Organization and WebSite
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fabrico Fashion",
      "url": "https://fabricofashion.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fabricofashion.com/categories?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fabrico Fashion",
      "url": "https://fabricofashion.com",
      "logo": "https://fabricofashion.com/favicon.ico",
      "sameAs": [
        "https://www.facebook.com/fabricofashion"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+8801700000000",
        "contactType": "customer service"
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient initialProducts={products} initialSettings={settings} />
    </>
  );
}
