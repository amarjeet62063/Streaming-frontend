import React from 'react'
import { useCurrentUser } from '../features/auth/authHooks'

function Home() {
const{data:data}=  useCurrentUser();

console.log(data.data);

  return (
    <div className="h-min w-md px-7 py-2">
      <h1>
        <ul>
          Hii<li>{data.data.fullname.toUpperCase()}</li>
          <li>{data.data.username}</li>
          <li>{data.data.email}</li>
          <img className='rounded-md ' src={data.data.coverimage.url} alt="loading..." />
          < img className=' rounded-full  ' src={data.data.avatar.url} alt="loading..." />
        </ul>
      </h1>
    </div>
  );
}

export default Home
