import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock( '../../src/hooks/useFetchGifs' );

describe('Prueba en <GifGrid />', () => {

    const category = 'Yoda';

    test('Debe de demostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({

            images: [],
            isLoading: true,

        });

        render(<GifGrid category={ category } />);

        expect( screen.getByText( 'Cargando...' ) );
        expect( screen.getByText( category ) );

    });

    test('Debe de mostrar items cuando se cargan las imágenes useFetchGifs', () => {

        const gifs = [

            {
                id: 'ABC',
                title: 'Yoda 1',
                url: 'https://mi-imagen.com/mi-imagen-1.jpg'
            },
            {
                id: 'DEF',
                title: 'Yoda 2',
                url: 'https://mi-imagen.com/mi-imagen-2.jpg'
            },
        ];

        useFetchGifs.mockReturnValue({

            images: gifs,
            isLoading: false,

        });

        render(<GifGrid category={ category } />);
        expect( screen.getAllByRole( 'img' ).length ).toBe( 2 );

    });

});