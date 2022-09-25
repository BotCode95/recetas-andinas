import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
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
