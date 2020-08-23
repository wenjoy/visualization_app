import Link from 'next/link';

export default function () {
  const routes = [
    { href: 'cars/trait', text: 'trait' },
    { href: 'cars/sales', text: 'sales' },
  ];
  return (
    <div>
      <ul className="flex">
        {routes.map((item) => (
          <li className="mr-6 flex-1">
            <Link href={item.href}>
              <a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#">
                {item.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
