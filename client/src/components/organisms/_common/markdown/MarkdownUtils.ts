type TDrop =
  | ((instance: CodeMirror.Editor, event: DragEvent) => void)
  | undefined;

export const handleMarkdownChange = (
  value: string,
  setMarkdown: (markdown: string) => void,
) => {
  const breakedText = value.replace(/\n/g, '  \n');
  setMarkdown(breakedText);
};

export const uploadImage = async (file: File) => {
  try {
    console.log(file);
  } catch (error) {}
};

export const handleImageDrop: TDrop = (instance, event) => {
  console.log(instance);
  console.log(event);

  const files = event.dataTransfer?.files as FileList;
  const file = files[0];

  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    instance.replaceSelection(`![](${file.name})`);
  }
};

export const options = {
  toolbar: [
    'bold',
    'italic',
    'heading',
    '|',
    'quote',
    'unordered-list',
    'ordered-list',
    '|',
    'link',
    'image',
  ],
  renderingConfig: {
    singleLineBreaks: true,
  },
  uploadImage: true,
  imageUploadFunction: uploadImage,
  status: false,
  spellChecker: false,
} as EasyMDE.Options;
