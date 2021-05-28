import { useRecoilValue } from 'recoil';
import { randomItemState } from '../library/recoil-atoms';
import { make as ColorComponent } from '../library/Demo/ColorComponent.gen';


const IndexPage = () => {
  const randomItem = useRecoilValue(randomItemState);
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <p>
        {randomItem}
      </p>
      <ColorComponent color="Blue" name="Shashan" />
    </div>
  )
}

export default IndexPage
