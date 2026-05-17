import { supabase } from "@/lib/supabase";
import HomeClient from "./HomeClient";

// Metadata for homepage
export const metadata = {
  title: "Alizenmart - Best Online Shopping in Bangladesh",
  description: "Explore Alizenmart for high-quality gadgets, smart electronics, home & lifestyle, beauty, fashion, and baby products with super-fast delivery in Bangladesh.",
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
      "name": "Alizenmart",
      "url": "https://alizenmart.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://alizenmart.com/categories?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Alizenmart",
      "url": "https://alizenmart.com",
      "logo": "https://alizenmart.com/favicon.ico",
      "sameAs": [
        "https://www.facebook.com/alizenmart"
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
