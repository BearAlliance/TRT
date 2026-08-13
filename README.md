# TRT Bicycles

Website source for [TRT Bicycles](https://trtbicycles.com).

## Development

Install npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Inventory CMS

The public inventory is served by a small local API. Copy `.env.example` to
`.env.local`, set `CMS_PASSWORD_HASH` with the command shown in that file, and
set a long random `CMS_SESSION_SECRET`. Then run:

```bash
npm run dev
```

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage
items. Local records and image uploads live in the ignored `.data/` directory.

Production is defined in `render.yaml`. It creates the static site and a paid,
single-instance CMS service with a 1 GB persistent disk at `/var/data`.
Configure `cms.trtbicycles.com` as a CNAME to the CMS service's Render URL,
then set the prompted `CMS_PASSWORD_HASH` secret during the first Blueprint
apply. Disk-backed deploys briefly interrupt the CMS API and cannot scale to
multiple instances.

## Customizing

Modify files in the `/src` folder.
The site will auto-update as you edit these files.
