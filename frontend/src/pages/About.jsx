import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={" US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt="About SwiftCart"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At <b>SwiftCart</b>, we are committed to transforming your shopping
            experience with convenience, speed, and trust. From everyday
            essentials to unique finds, our platform is designed to bring you
            the best products at your fingertips. Whether you're stocking up on
            groceries, discovering new gadgets, or looking for the perfect gift
            — SwiftCart provides a seamless, reliable, and enjoyable shopping
            journey. We leverage smart technology and a carefully curated catalog to
            ensure our customers always find what they need — quickly and
            affordably. With easy navigation, secure payments, real-time order
            tracking, and fast delivery, SwiftCart isn't just a marketplace —
            it's your everyday shopping companion.
          </p>

          <p>
            With a user-friendly interface and secure payment options, we ensure
            that every transaction is seamless and reliable. Whether you're at
            home, at work, or on the move — SwiftCart is here to deliver
            happiness with just a few clicks.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to simplify e-commerce by offering a platform where
            quality meets convenience. We strive to empower customers with
            timely deliveries, excellent support, and an unmatched product
            range, making SwiftCart your go-to destination for hassle-free
            online shopping.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY "} text2={" CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Every product on SwiftCart is carefully selected and verified for
            quality. We partner only with trusted sellers to ensure you receive
            items that meet your expectations every single time.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Shop from anywhere, anytime. Our intuitive platform and quick
            checkout process save you time so you can focus on what matters
            most. Get your products delivered to your door effortlessly.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is here for you 24/7. Whether it's order
            help, product queries, or return assistance — we go the extra mile
            to ensure your experience is smooth and satisfying.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
