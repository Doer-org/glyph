import { Title } from '@/components/atoms/Title';
import { Txt } from '@/components/atoms/Txt';
import { AnimatedSvgLogo } from '@/components/atoms/svgs/AnimatedSvgLogo';
import { type NextPage } from 'next';

const About: NextPage = () => {
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
        <a href="http://localhost:8080/auth/login?redirect_url=http://localhost:3000/">
          login
        </a>
      </div>
    </main>
  );
};
export default About;
