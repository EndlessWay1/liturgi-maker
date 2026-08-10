export function About() {
  return (
    <div id='about' className='h-dvh bg-colors text-colors'>
      <h1>About This Website</h1>
      <div id='about-content'>
        <p>
          The original website was created by Hansen Susilo, this webiste is a
          remake of that.
        </p>

        <div className='border outline p-2 mx-auto rounded-2xl hover:outline-offset-2'>
          <a href='https://liturgi-generator.vercel.app/'>Old Website</a>
        </div>
        <p>
          This website was created for learning purposes. All <span>bugs</span>{" "}
          or <span>critisicm</span> can be presented at yourself.
        </p>

        <p>Any usefull advice can be sent to the author via email.</p>

        <div id='email'>
          <img src='email.png' alt='email' />
          <span className='text-lg'>:</span>
          <p>nicksonkiyoshi@gmail.com</p>
        </div>
        <p>
          Credits to{" "}
          <a href='https://github.com/erwindosianipar/beeble'>beeble app</a> for
          providing the passage, and{" "}
          <a href='http://alkitab.app'>alkitab app</a> for providing the lyrics.
        </p>
        <div className='border outline p-2 mx-auto rounded-2xl hover:outline-offset-2'>
          <a href='https://github.com/EndlessWay1/liturgi-maker'>Source Code</a>
        </div>
      </div>
    </div>
  );
}
