import Vue from 'vue';

Vue.mixin({
  data() {
    return {
      text: {
        paragraph_short: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. </p>`,
        paragraph: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor. Pellentesque rutrum accumsan interdum. Morbi elementum, nibh id malesuada gravida, sapien mi fringilla nisl, sit amet rutrum dui velit quis est. Suspendisse mollis, dolor vitae auctor interdum, eros elit iaculis arcu,</p>`,
        paragraphs: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor.</p><p> Pellentesque rutrum accumsan interdum. Morbi elementum, nibh id malesuada gravida, sapien mi fringilla nisl, sit amet rutrum dui velit quis est. Suspendisse mollis, dolor vitae auctor interdum, eros elit iaculis arcu,</p>`,
        sentence: `<p>Donec bibendum vel tortor id auctor.</p>`,
        headings: {
          h1: `<h1>Fusce ac massa ac nisi lobortis</h1>`,
          h2: `<h2>Duis sit amet libero at mi lacinia porttitor</h2>`,
          h3: `<h3>Aliquam id commodo velit, nec ultricies nisl</h3>`,
          h4: `<h4>Mauris vestibulum dui dui</h4>`,
          h5: `<h5>Quisque auctor lacus vel ipsum</h5>`,
          h6: `<h6>In hac habitasse platea dictumst</h6>`
        },
        string: {
          short: 'The quick brown fox jumps over the lazy dog.',
          long:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor.'
        }
      },
      images: {
        banner_image: {
          alt: 'Image Alt Text',
          dimensions: {
            width: 1920,
            height: 960
          },
          url: '/fpo/1920x960-dark.jpg',
          half: {
            dimensions: {
              width: 800,
              height: 800
            },
            url: '/fpo/1920x560-dark.jpg'
          },
          mobile: {
            dimensions: {
              width: 800,
              height: 800
            },
            url: '/fpo/800x800-dark.jpg'
          },
          mobile_half: {
            dimensions: {
              width: 800,
              height: 400
            },
            url: '/fpo/800x400-dark.jpg'
          },
          vertical: {
            dimensions: {
              width: 1920,
              height: 960
            }
          }
        },
        banner_image_light: {
          alt: 'Image Alt Text',
          dimensions: {
            width: 1920,
            height: 960
          },
          url: '/fpo/1920x960-light.jpg',
          half: {
            dimensions: {
              width: 800,
              height: 800
            },
            url: '/fpo/1920x560-light.jpg'
          },
          mobile: {
            dimensions: {
              width: 800,
              height: 800
            },
            url: '/fpo/800x800-light.jpg'
          },
          mobile_half: {
            dimensions: {
              width: 800,
              height: 400
            },
            url: '/fpo/800x400-light.jpg'
          },
          vertical: {
            dimensions: {
              width: 1920,
              height: 960
            }
          }
        },
        galleryItems: {
          caption: 'This is a caption',
          image: {
            url: '/fpo/gallery-lg.jpg',
            alt: 'This is gallery image alt text',
            dimensions: {
              width: 1600,
              height: 1067
            },
            sm: {
              url: '/fpo/gallery-sm.jpg',
              alt: 'This is a Small Image',
              dimensions: {
                width: 600,
                height: 400
              }
            },
            md: {
              url: '/fpo/gallery-md.jpg',
              alt: 'This is a Medium Image',
              dimensions: {
                width: 900,
                height: 600
              }
            },
            lg: {
              url: '/fpo/gallery-lg.jpg',
              alt: 'This is a Large Image',
              dimensions: {
                width: 1600,
                height: 1067
              }
            }
          }
        },
        galleryItemsNoCaption: {
          image: {
            caption: null,
            url: '/fpo/gallery-lg.jpg',
            alt: 'This is gallery image alt text',
            dimensions: {
              width: 1600,
              height: 1067
            },
            sm: {
              url: '/fpo/gallery-sm.jpg',
              alt: 'This is a Small Image',
              dimensions: {
                width: 600,
                height: 400
              }
            },
            md: {
              url: '/fpo/gallery-md.jpg',
              alt: 'This is a Medium Image',
              dimensions: {
                width: 900,
                height: 600
              }
            },
            lg: {
              url: '/fpo/gallery-lg.jpg',
              alt: 'This is a Large Image',
              dimensions: {
                width: 1600,
                height: 1067
              }
            }
          }
        },
        thumbnail: {
          url: '/fpo/thumbnail.jpg',
          alt: 'Alt text about this thumbnail',
          dimensions: {
            width: 410,
            height: 266
          }
        }
      },
      selectOptions: [
        {label: 'Option 1', value: 1},
        {label: 'Option 2', value: 2},
        {label: 'Option 3', value: 3},
        {label: 'Option 4', value: 4}
      ],
      video: '/fpo/demo-video.mp4'
    };
  }
});
