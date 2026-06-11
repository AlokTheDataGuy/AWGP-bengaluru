import './GalleryStrip.css';

// In Next.js, files in /public are served from the site root — reference
// them by URL string rather than importing from an assets/ folder.
const images = [
  { src: '/assets/chetna-kendra/gayatri-mata-mandir.png', label: 'Gayatri Mata' },
  // { src: '/assets/chetna-kendra/building.png', label: 'Chetna Kendra' },
  { src: '/assets/chetna-kendra/mandir.png', label: 'Mandir' },
  { src: '/assets/chetna-kendra/yagya-shala.png', label: 'Yagya Shala' },
  { src: '/assets/chetna-kendra/library.png', label: 'Library' },
  { src: '/assets/chetna-kendra/meditation_room.JPG', label: 'Meditation Room' },
  { src: '/assets/chetna-kendra/gaushala.png', label: 'Gaushala' },
];

export default function GalleryStrip() {
  return (
    <section className="gallery-strip" aria-label="Photo Gallery">
      {images.map((img, i) => (
        <div key={i} className="gallery-strip__item">
          <img src={img.src} alt={img.label} className="gallery-strip__img" loading="lazy" />
          <div className="gallery-strip__overlay" />
          <span className="gallery-strip__label">{img.label}</span>
        </div>
      ))}
    </section>
  );
}
