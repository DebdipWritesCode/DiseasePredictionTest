import headerLogo from '../assets/image1.png'

const Header = () => {
  return (
    <div className="p-8">
      <div className="flex gap-8 items-center">
        <h1 className='text-[70px] font-semibold font-poppins'>Plant Disease Prediction</h1>
        <img src={headerLogo} alt="Header Logo" className='h-20 w-24' />
      </div>
      <p className=' text-xl font-poppins '>- made by "The Six Musketeers"</p>
      <h3 className=' text-right mt-4 font-normal text-[40px] font-poppins mr-[120px] text-green-800'>Plant Disease Prediction</h3>
    </div>
  )
}

export default Header