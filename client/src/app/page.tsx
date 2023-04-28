import { getToken } from '@/api/utils/token';
import { Title } from '@/components/atoms/Title';
import { Txt } from '@/components/atoms/Txt';
import { AnimatedSvgLogo } from '@/components/atoms/svgs/AnimatedSvgLogo';

const About = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/validate`,
    {
      method: 'GET',
      headers: {
        jwt: getToken(),
      },
    },
  );
  const isValid = resp.status !== 400;
  // console.log(resp.status);
  // console.log(await resp.json());
  return (
    <main className="text-center pt-40">
      <Txt elm="h1" size="text-6xl" weight="font-bold">
        <Title stroke />
      </Txt>
      <Txt elm="p" className="my-4" size="text-2xl">
        Glyph is a document sharing application
      </Txt>

      <div className="m-auto">
        <AnimatedSvgLogo />
      </div>
      <div>
        <a
          href={
            // isValid
            //   ? `${process.env.NEXT_PUBLIC_FRONT_URL}/service/glyphs`
            //   :
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login?redirect_url=${process.env.NEXT_PUBLIC_FRONT_URL}/service/glyphs`
          }
        >
          login
        </a>
      </div>
    </main>
  );
};
export default About;
