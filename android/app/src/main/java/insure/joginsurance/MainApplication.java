package insure.joginsurance;

import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.filepicker.FilePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.keyee.pdfview.PDFView;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.photoview.PhotoViewPackage;

import java.util.Arrays;
import java.util.List;

import io.fullstack.firestack.FirestackPackage;

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
            new FirestackPackage(),
            new PDFView(),
            new PhotoViewPackage(),
            new RCTCameraPackage(),
            new FilePickerPackage(),
            new RNDeviceInfo(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new RNSpinkitPackage(),
            new ReactNativeConfigPackage()
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
