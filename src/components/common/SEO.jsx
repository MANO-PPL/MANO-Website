import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    canonical, 
    ogType = 'website', 
    ogImage = '/hero-collage-1.webp',
    keywords = 'MANO, construction, project management, EPC, PMC, engineering, consultancy',
    schemaData = null,
    faqData = null,
    breadcrumbData = null,
    navigationData = null
}) => {
    const siteName = 'MANO Projects Private Limited';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const siteUrl = 'https://www.mano.co.in';
    const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

    // Default Breadcrumb Schema
    const defaultBreadcrumb = breadcrumbData || [
        { name: 'Home', item: siteUrl }
    ];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": defaultBreadcrumb.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
        }))
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

            {/* Robots */}
            <meta name="robots" content="index, follow" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}

            {faqData && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })}
                </script>
            )}

            {navigationData && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": navigationData.map((nav, index) => ({
                            "@type": "SiteNavigationElement",
                            "position": index + 1,
                            "name": nav.name,
                            "url": `${siteUrl}${nav.url}`
                        }))
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
