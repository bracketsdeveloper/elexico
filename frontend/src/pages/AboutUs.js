import React from 'react'
import Logo from '../components/Logo'
import sesame from '../assets/banners/sesame.jpg'
import groundnut from '../assets/banners/groundnut.jpg'
import coconut from "../assets/banners/coconutoil.jpg"
import sunflower from "../assets/banners/sunflower.jpg"
import safflower from "../assets/banners/sunflower.jpg"
import mustard from "../assets/banners/mustard.jpg"
import neem from "../assets/banners/oil.jpg"
import castor from "../assets/banners/caster.jpg"
import hair_oil from "../assets/banners/hairoil.jpg"
import almond from '../assets/banners/oil.jpg'
import eucalyptus from '../assets/banners/oil.jpg'
import lamp_oil from '../assets/banners/lamp.jpg'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 text-center mt-6">
         About Us
        </h1>
        
      </div>
    </div>
  )
}

export default AboutUs
