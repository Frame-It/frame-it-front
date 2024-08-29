import { letterList } from '@/constants/data';

export default function LetterPage() {
  // letter 받아오기

  return (
    <main className="px-4">
      <ul className="mt-6 space-y-6">
        {letterList.map((letter) => (
          <li className="" key={letter.id}>
            asdfdfsa
          </li>
        ))}
      </ul>
    </main>
  );
}
