

type IProps = {
    images: string[] | undefined
}
export default function ImageGallery({ images }: IProps) {


    return (
        <div className="flex justify-between w-full flex-wrap ">

            {images?.map(image => (
                <img src={image} key={image} alt={'note'} className='w-32 h-32' />
            ))}
        </div>

    )

}