import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div>
        <Link href="/" passHref>
          <div>
            <Image
              src="/logo.svg"
              alt='icon App'
              width={60}
              height={60}
              />
          </div>
          </Link>
    </div>
  )
}
