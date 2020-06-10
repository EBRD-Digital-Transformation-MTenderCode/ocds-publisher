#echo 'Stopping service...'
#docker service rm ocds-publisher

echo 'Re-deploying'
docker service create --name="ocds-publisher" \
  --env SERVICE_PORT=5100 \
  --env PUBLIC_POINT_URL=https://public.mtender.gov.md \
  --publish published=5100,target=5100 \
  --network ocds-network \
  --dns 10.0.10.115 \
  --with-registry-auth \
  docker-registry.eprocurement.systems/ocds-publisher:1.1.1.1
