import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const routes = [{ href: '/cars', text: 'cars' }];
  return (
    <div>
      <ul className="flex">
        {routes.map((item) => (
          <li className="mr-6 text-blue-500 hover:text-blue-800">
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
