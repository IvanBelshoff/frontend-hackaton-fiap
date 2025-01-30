
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './css/styles.css';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MdClose, MdSave } from 'react-icons/md';

interface CropperModalProps {
    src: string;
    setPreview: (url: string | null) => void;
    cancelPhoto: () => void;
    onSave: (blob: Blob, state?: 'original' | 'edição' | 'preview') => void;
    size?: number;
    type?: string;
}

export const CropperModal: React.FC<CropperModalProps> = ({ src, setPreview, cancelPhoto, onSave, size, type }) => {

    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef<AvatarEditor>(null);

    // Handle save
    const handleSave = async () => {
        if (cropRef.current) {
            const canvas = cropRef.current.getImage();
            canvas.toBlob(blob => {
                if (blob) {
                    onSave(blob, 'preview');
                    setPreview(URL.createObjectURL(blob));
                }
            }, type, 0.4);
        }
    };

    const checkFileSizeBoolean = (fileSizeInBytes: number, maxSizeInMB: number): boolean => {
        // Convertendo o limite de MB para bytes
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        // Verifica se o arquivo ultrapassa o tamanho máximo
        if (fileSizeInBytes > maxSizeInBytes) {
            return true;
        }

        // Retorna null se o arquivo estiver dentro do limite
        return false;
    };

    // Handle scroll to change slider value
    const handleWheel = (event: React.WheelEvent) => {

        const delta = Math.sign(event.deltaY);

        setSlideValue(prev => {
            const newValue = prev - delta;
            return Math.min(Math.max(newValue, 10), 50);
        });

    };

    return (
        <div
            className='w-[70%] h-auto flex flex-col justify-center items-center'>
            <div
                className='flex w-full h-full flex-col justify-center items-center'
                onWheel={size && checkFileSizeBoolean(size, 4) ? undefined : handleWheel}
            >
                <AvatarEditor
                    ref={cropRef}
                    image={src}
                    className="avatar-editor"
                    style={{ width: '100%', height: '100%' }}
                    border={50}
                    borderRadius={150}
                    color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={0}
                />
            </div>

            {
                size && checkFileSizeBoolean(size, 4) ? (

                    <div
                        className='flex w-full justify-center items-center pt-2'>
                        <p color={'red'}>
                            O arquivo é maior do que o tamanho permitido de {4} MB.
                        </p>
                    </div>

                ) : (
                    <div
                        className='flez w-full justify-center items-center p-1 mt-4 bg-paper'
                    >
                        <Slider
                            min={10}
                            max={50}
                            className='w-full cursor-pointer'
                            defaultValue={[slideValue]}
                            value={[slideValue]}
                            onValueChange={(e) => setSlideValue(e[0])}
                        />
                    </div>
                )
            }

            <div className='flex w-full justify-center items-center p-2 mt-2 flex-col'>

                <div
                    className='flex w-full justify-center items-center gap-4'
                >
                    <Button
                        disabled={size ? checkFileSizeBoolean(size, 4) : false}
                        onClick={handleSave}
                    >
                        <MdSave />
                        Salvar
                    </Button>
                    <Button
                        variant={'outline'}
                        onClick={cancelPhoto}
                    >
                        <MdClose />
                        Cancelar
                    </Button>
                </div>
            </div>
        </div >
    );
};
