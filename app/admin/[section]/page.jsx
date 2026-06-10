import SectionEditor from './SectionEditor';

export async function generateStaticParams() {
  return ['activities', 'programs', 'sanskars', 'events', 'schedule', 'site'].map((s) => ({
    section: s,
  }));
}

export default async function AdminSectionPage({ params }) {
  const { section } = await params;
  return <SectionEditor section={section} />;
}
