import { Map } from "../../components/Map";
import './styles.scss';

export function Home(){
  return(
    <main className="container">
      <h1>Helix Maps</h1>
      <Map />
    </main>
  );
}