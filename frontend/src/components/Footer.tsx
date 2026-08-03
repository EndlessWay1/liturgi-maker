import { aboutMe } from "../constants";

export default function Footer() {
  return (
    <footer id='footer'>
      <div className='links'>
        <p>Copyright © 2026 GKI Perumahan Citra 1. All rights reserved.</p>

        <ul>
          {aboutMe.map(({ id, img, name, link }) => {
            return (
              <li key={id}>
                <div className="flex flex-row gap-1 my-auto">

                <img src={img} alt={id} />
                <a href={link} className="my-auto">{name}</a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
