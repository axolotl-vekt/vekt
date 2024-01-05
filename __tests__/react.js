import React from 'react'
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { Link, useNavigate} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks() // is this necessary?

//import components
import App from '../client/App';
import Login from '../client/components/Login';
import SignUp from '../client/components/SignUp';
import Homepage from '../client/components/Homepage';
import Navbar from '../client/components/Navbar';
import Modal from '../client/components/Modal';


describe('Unit testing React components', () => {
    describe('Navbar', () => {

        beforeEach(()=>{
            render(
                <BrowserRouter>
                  <Navbar />
                </BrowserRouter>
              );
        })
        test('Renders the Navbar with correct number of links', ()=> {
            const links = screen.getAllByRole('listitem');
            expect(links.length).toBe(5);
        })

            test('renders Home link', () => {
              const homeLink = screen.getByText('Home');
              expect(homeLink).toBeInTheDocument();
            });
          
            test('renders About link', () => {
              const aboutLink = screen.getByText('About');
              expect(aboutLink).toBeInTheDocument();
            });
          
            test('renders Contact link', () => {
              const contactLink = screen.getByText('Contact');
              expect(contactLink).toBeInTheDocument();
            });
          
            test('renders Games link', () => {
              const gamesLink = screen.getByText('Games');
              expect(gamesLink).toBeInTheDocument();
            });
          
            test('renders Logout link', () => {
              const logoutLink = screen.getByText('Logout');
              expect(logoutLink).toBeInTheDocument();
            });
          

    });
    describe('Login', () => {
        beforeEach(()=>{
            render(
                <BrowserRouter>
                  <Login />
                </BrowserRouter>
              );
        })
        test('renders username input field', () => {
            const username = screen.getByRole('textbox');
            expect(username).toBeInTheDocument();
        })
        test('renders password input field', () => {
            const password = screen.getByPlaceholderText('Enter Password');
            expect(password).toBeInTheDocument();
        })
        test('renders sign in button', () => {
            const signIn = screen.getByRole('button');
            expect(signIn).toBeInTheDocument();
            expect(signIn).toHaveTextContent('Sign in');
        })
    });
    
    describe('SignUp', () => {
        beforeEach(()=>{
            render(
                <BrowserRouter>
                  <SignUp />
                </BrowserRouter>
              );
        });
        test('Sign up components TBD', () => {});
    });
    describe('Modal', () => {
        beforeEach(()=>{
            render(
                <BrowserRouter>
                  <Modal />
                </BrowserRouter>
              );
        });
        test('Modal components TBD', () => {});
    });

    //ignore for now
    xdescribe('Homepage', () => {
        // Need to define mock fetch request to fix the following error:
        // FetchError {
        //     message: 'invalid json response body at  reason: Unexpected end of JSON input',
        //     type: 'invalid-json'
        //   } 

        // Need to find a way to skip chart rendering
        
        beforeEach(()=>{
            render(
                <BrowserRouter>
                  <Homepage />
                </BrowserRouter>
              );
        })
        test('renders Header', () => {
            const vektorHeader = screen.getByText('Invektus');
            expect(vektorHeader).toBeInTheDocument();
        });
    });
});

