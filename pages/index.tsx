import { useRecoilValue } from 'recoil';
import { randomItemState } from '../lib/recoil-atoms';


const IndexPage = () => {
  const randomItem = useRecoilValue(randomItemState)
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <p>
        {randomItem}
      </p>
    </div>
  )
}

export default IndexPage
