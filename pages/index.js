import { useState, useEffect } from 'react'
import {client, recommendProfiles} from '../api'
import Link from 'next/link'

import Image from 'next/Image'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  

  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise()
      console.log({ response })
      setProfiles(response.data.recommendedProfiles)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div>
      {
        profiles.map((profile, index) => {
          <Link href={`/profile/${profile.id}`}>
            <a>
              <div>
                {
                  profile.picture ? (
                    <Image
                      src={profile.picture.original.url}
                      height="60px"
                      width="60px"
                    />
                  ) : (
                      <div
                        style={{ width: '60px', height: '60px' }}/>
                  )
                }
              <h4>{profile.handle}</h4>
              <p>{profile.bio}</p>
            </div>
          </a></Link>
        })
      }
   </div>
  )
}
