import Image from 'next/image';

export const LockIcon = () => {
  return (
    <div className="lock-icon-container">
      <Image
        src={`${process.env.iisPath}/img/icons/lock.svg`}
        alt="lock"
        width={20}
        height={20}
      />
    </div>
  )
}
