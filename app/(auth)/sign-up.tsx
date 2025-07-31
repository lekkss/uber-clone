import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage || "Sign up failed");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // TODO: Create a database user!
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          state: "error",
          error: signUpAttempt.status || "Verification failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        state: "error",
        error: err.errors[0].longMessage || "Verification failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px]"
            resizeMode="contain"
          />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Create an account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            icon={icons.email}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          {/* OAuth */}
          <OAuth />
          <Link
            href="/sign-in"
            asChild
            className="text-lg text-center  text-general-200 mt-10"
          >
            <Text>
              Already have an account?{" "}
              <Text className="text-primary-500">Sign In</Text>
            </Text>
          </Link>
          {/*  */}
          <ReactNativeModal
            isVisible={
              verification.state === "pending" || verification.state === "error"
            }
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true);
            }}
          >
            <View className="px-7 py-9 rounded-2xl min-h-[300px] bg-white">
              <Text className="text-center text-2xl font-JakartaExtreBold mb-2">
                Verification
              </Text>
              <Text className="text-center text-gray-400 font-Jakarta mb-5">
                We&apos;ve sent you an email to {formData.email} with a
                verification code.
              </Text>
              <InputField
                label="Code"
                placeholder="12345"
                icon={icons.lock}
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className="text-sm text-red-500 mb-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify Email "
                onPress={onVerifyPress}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>
          {/* Verification Modal */}
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="px-7 py-9 rounded-2xl min-h-[300px] bg-white">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
                resizeMode="contain"
              />
              <Text className="text-center text-3xl font-JakartaBold">
                Verified
              </Text>
              <Text className="text-center text-gray-400 font-Jakarta mt-2">
                You&apos;ve successfully created an account.
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => router.replace("/(root)/(tabs)/home")}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
