import fetch from 'node-fetch';

async function test() {
  const url = 'https://drive.google.com/file/d/1g2uZF0UTvXazXSVRXucistDMEa-DYaqB/preview';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    console.log('Headers:', [...res.headers.entries()]);
  } catch (err) {
    console.error(err);
  }
}

test();
