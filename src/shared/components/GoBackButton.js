import Image from 'next/image';
import { useRouter } from 'next/router';

export const GoBackButton = () => {

  const router = useRouter();

  return (
    <div className="w-full max-w-md go_back-container">
      <button
        onClick={() => router.back()}
        className="self-start block"
      >
        <Image
          src="/img/icons/go_back_icon.svg"
          alt="Go back"
          width={50}
          height={50}
        />
      </button>
    </div>
  );
};