#!/bin/sh -l

cd $GITHUB_WORKSPACE/$INPUT_WORKDIR || exit 1

REVIEWDOG_YML=$(cat << EOS
runner:
  govet:
    cmd: go vet -vettool=\$(which logfind) ./...
    errorformat:
      - "%f:%l:%c: %m"
EOS
)
echo "$REVIEWDOG_YML" > .reviewdog_complexity.yml

export REVIEWDOG_GITHUB_API_TOKEN="$INPUT_GITHUB_TOKEN"

echo "::group:: reviewdog: go vet -vettool=\$(which logfind) ./..."
reviewdog -conf=./.reviewdog_complexity.yml -reporter=github-pr-check -level=info -filter-mode=file
echo '::endgroup::'
