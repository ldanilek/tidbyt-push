import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useQuery, useMutation } from '../convex/_generated/react'
import { useCallback, useRef } from 'react'
import React from 'react'

function _arrayBufferToBase64( buffer: ArrayBuffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

const ImageFromBytes = ({ data }: { data: ArrayBuffer }) => {
  const b64 = _arrayBufferToBase64(data);
  return <img src={`data:image/jpeg;base64,${b64}`} />;
}

const ImageInput = () => {
  const fileInput = useRef<any>(null);
  const uploadImage = useMutation('uploadImage');

  const upload = async () => {
    if (!fileInput.current) {
      return;
    }
    if (!fileInput.current.files.length) {
      return;
    }
    const arrayBuffer = await fileInput.current.files[0].arrayBuffer();
    await uploadImage(arrayBuffer);
  };

  return (<div>
    <p>The image must be a 64x32 PNG, WebP, or GIF</p>
    Upload file: <input type="file" ref={fileInput} />
    <button className={styles.button} onClick={upload}>
          Upload
        </button> 
  </div>);
}

const Home: NextPage = () => {
  const image = useQuery('getImage');

  return (
    <div className={styles.container}>
      <Head>
        <title>Tidbyt Push</title>
        <meta name="description" content="Use Convex to push an image to a Tidbyt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Push image to a Tidbyt
        </h1>

        { image ? 
          <div><p>Currently uploaded image</p><ImageFromBytes data={image} /></div>
         : null}
        
        <ImageInput />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.convex.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/convex.svg" alt="Convex Logo" width={90} height={18} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
