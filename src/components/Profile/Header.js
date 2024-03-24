import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar>
            <Container>
                <Navbar.Brand>
                    Mail Box
                </Navbar.Brand>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header