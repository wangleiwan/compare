package com.mitel.uc.smb.mobile;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
          new LottiePackage(),
          new SplashScreenReactPackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new ReactNativeRestartPackage(),
          new MapsPackage(),
          new LinearGradientPackage(),
          new ReactNativeI18n(),
          new ExtraDimensionsPackage(),
          new BlurViewPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
