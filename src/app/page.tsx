import OsRoot from '@/components/OsRoot';
import { profile, socials } from '@/lib/data/profile';
import { experience } from '@/lib/data/experience';
import { projects } from '@/lib/data/projects';

/**
 * The interactive desktop is client-only, so the server also renders a plain, visually hidden
 * summary. Search engines, link previews and screen readers get real content instead of a
 * blank page.
 */
export default function Home() {
  return (
    <>
      <section className="sr-only">
        <h1>
          {profile.name}: {profile.title}
        </h1>
        <p>{profile.summary}</p>
        <p>
          {profile.location}. Email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
        <ul>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url}>{s.name}</a>
            </li>
          ))}
          <li>
            <a href="/resume.pdf">Resume (PDF)</a>
          </li>
        </ul>
        <h2>Experience</h2>
        <ul>
          {experience.map((e) => (
            <li key={e.id}>
              {e.role}, {e.company} ({e.duration}): {e.summary}
            </li>
          ))}
        </ul>
        <h2>Projects</h2>
        <ul>
          {projects
            .filter((p) => !p.retired)
            .map((p) => (
              <li key={p.id}>
                <a href={p.website && p.website !== '#' ? p.website : p.github}>{p.title}</a>: {p.description}
              </li>
            ))}
        </ul>
      </section>
      <OsRoot />
    </>
  );
}
