import MemeDraft from '../models/memeDraft.js';

export const getMemeDrafts = async (req, res) => {
  const memeDrafts = await MemeDraft.find({ owner: req.user._id });
  return res.json({ success: true, memeDrafts });
};

export const saveMemeDraft = async (req, res) => {
  const name = req.body.name || 'Unnamed Draft';
  const templateUrl = req.body.templateUrl;
  const templateId = req.body.templateId;
  const memeConfig = req.body.memeConfig;

  if (!templateUrl || !memeConfig) {
    return res.status(400).json({ success: false });
  }

  const memeDraft = await new MemeDraft({
    owner: req.user._id,
    name,
    templateUrl,
    templateId,
    memeConfig,
  }).save();

  return res.json({ success: true, memeDrafts: [memeDraft] });
};

export const deleteMemeDraft = async (req, res) => {
  const memeDraft = await MemeDraft.findById(req.params.id);
  // only allow deletion of own meme drafts
  if (!memeDraft || !memeDraft.owner.equals(req.user._id)) {
    return res.status(401).json({ success: false });
  }

  // delete meme draft
  await MemeDraft.findByIdAndDelete(req.params.id);
  return res.json({ success: true });
};
