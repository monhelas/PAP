import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal'; // Importe o componente Modal

// Defina props de exemplo
const requiredProps = {
    title: 'Test Modal',
    isVisible: true,
    children: 'Modal Content',
    setIsVisible: jest.fn(), // Use jest.fn() para criar uma função simulada para setIsVisible
};

describe('Modal Component', () => {
    it('renders modal title and content', () => {
        render(<Modal {...requiredProps} />);

        expect(screen.getByText(requiredProps.title)).toBeDefined();
        expect(screen.getByText(requiredProps.children)).toBeDefined();
    });

    it('calls setIsVisible function and closes modal when close button is clicked', () => {
        render(<Modal {...requiredProps} />);

        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);

        expect(requiredProps.setIsVisible).toHaveBeenCalledWith(false);
    });
});
