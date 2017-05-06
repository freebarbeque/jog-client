package insure.joginsurance;

import android.app.Application;

import com.facebook.react.ReactApplication;
import insure.joginsurance.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.keyee.pdfview.PDFView;
import com.imagepicker.ImagePickerPackage;
import io.fullstack.firestack.FirestackPackage;
import com.filepicker.FilePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new PhotoViewPackage(),
            new PDFView(),
            new ImagePickerPackage(),
            new FirestackPackage(),
            new FilePickerPackage(),
            new RNFetchBlobPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new RCTCameraPackage()
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
