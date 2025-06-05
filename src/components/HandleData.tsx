import { SocialNetwork, UserHandle } from '../types';

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl font-black text-center">{data.handle}</p>
      {data.image && (
        <img src={data.image} className="max-w-[250px] mx-auto rounded-full" />
      )}
      <p className="text-lg font-bold text-center">{data.description}</p>
      <div className="flex flex-col gap-6 mt-20">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="flex items-center gap-5 px-5 py-2 bg-white rounded-lg"
              rel="noreferrer noopener"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="imagen red social"
                className="w-12"
              />
              <p className="text-lg font-bold text-black capitalize">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">Sin Enlaces</p>
        )}
      </div>
    </div>
  );
}
