import { SocialNetwork } from '../types';

type DevTreeLinkProps = {
  link: SocialNetwork;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  return (
    <div
      className="w-12 h-12 bg-cover"
      //   style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}
    ></div>
  );
}
