/**
 * Renders a JSON-LD <script> tag. Server component — the structured data is in
 * the initial HTML so crawlers (and AI answer engines) see it without running JS.
 *
 * Usage:
 *   import JsonLd from '@/components/seo/JsonLd';
 *   <JsonLd data={breadcrumbSchema(items, locale)} />
 *   <JsonLd data={[eventSchema(a), eventSchema(b)]} id="events" />
 *
 * Accepts a single schema object or an array of them.
 *
 * @param {{ data: object | object[], id?: string }} props
 */
export default function JsonLd({ data, id }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((node, i) => (
        <script
          key={id ? `${id}-${i}` : i}
          type="application/ld+json"
          // Schema is built from our own trusted config/content, not user input.
          dangerouslySetInnerHTML={{ __html: safeStringify(node) }}
        />
      ))}
    </>
  );
}

/**
 * Escape `<` so a stray "</script>" inside a string value can't break out of
 * the script context.
 * @param {object} node
 */
function safeStringify(node) {
  return JSON.stringify(node).replace(/</g, '\\u003c');
}
